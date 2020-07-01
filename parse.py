from lxml.etree import HTML
import requests
import json

words = [
    "olla",
    "istua",
    "seisoa",
    "syödä",
    "juoda",
    "odottaa",
    "ymmärtää",
    "muistaa",
    "unohtaa",
    "ajatella",
    "tietää",
    "osata",
    "opiskella",
    "oppia",
    "kysyä",
    "vastata",
    "pyytää",
    "sanoa",
    "kertoa",
    "keskustella",
    "nukkua",
    "herätä",
    "nousta",
    "maata",
    "pestä",
    "tiskata",
    "siivota",
    "imuroida",
    "uida",
    "kävellä",
    "pyöräillä",
    "ajaa",
    "juosta",
    "pelata*",
    "leikkiä*",
    "soittaa*",
    "ottaa",
    "antaa",
    "lainata",
    "tavata",
    "tutustua",
    "tehdä",
    "nähdä",
    "katsoa",
    "tulla",
    "mennä",
    "lähteä",
    "jäädä",
    "saapua",
    "käydä",
    "tuoda",
    "viedä",
    "rakastaa",
    "vihata",
    "tykätä*",
    "pelätä",
    "pukea",
    "riisua",
    "maksaa",
    "ostaa",
    "myydä",
    "kirjoittaa",
    "lukea",
    "kuunnella",
    "kuulla",
    "piirtää",
    "maalata",
    "nauraa",
    "itkeä",
    "hymyillä",
    "matkustaa",
    "muuttaa",
    "työntää",
    "vetää",
    "nostaa",
    "laskea",
    "laittaa",
    "heittää",
    "häiritä",
    "valita",
    "tarvita",
    "hoitaa",
    "auttaa",
    "varata",
    "tilata",
    "asua",
    "syntyä",
    "elää",
    "kuolla",
    "etsiä",
    "löytää",
    "avata",
    "sulkea",
    "korjata",
    "riittää",
    "laulaa"
]

doc = {}
for word in words:
    try:
        doc[word] = {
            "present": dict(zip(
                ["minä", "sinä", "hän", "me", "se", "he"],
                [
                    "".join(x.itertext())
                    for x in HTML(
                        requests.get(f"https://en.wiktionary.org/wiki/{word}").text
                    ).xpath("//table//td//span")
                    if "pres|indc-form-of" in x.attrib["class"]
                ]
            ))
        }
    except:
        pass

print(json.dumps(doc, ensure_ascii=False, indent=4).encode("utf-8").decode())
