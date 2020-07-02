from lxml.etree import HTML
import requests
import json
import pandas

df = pandas.read_html(
    requests.get("https://uusikielemme.fi/finnish-vocabulary/vocabulary-lists/your-first-100-finnish-verbs-finnish-for-beginners/").text
)[0]

doc = {}
for word, eng_def in list(df[["Finnish", "English"]].values):
    try:
        doc[word] = {
            "_def": eng_def,
            "present": dict(zip(
                ["minä", "sinä", "hän", "me", "te", "he"],
                [
                    "".join(x.itertext())
                    for x in HTML(
                        requests.get(f"https://en.wiktionary.org/wiki/{word}").text
                    ).xpath("//table//td//span")
                    if "pres|indc-form-of" in x.attrib["class"]
                ]
            ))
        }
        if doc[word]["present"] == {}:
            del doc[word]
    except:
        continue

print(json.dumps(doc, ensure_ascii=False, indent=4).encode("utf-8").decode())
