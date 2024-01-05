import wolframalpha
client = wolframalpha.Client("JVAG8V-6G9YEE35TX")
import wikipedia
import PySimpleGUI as sg

sg.theme('BrownBlue')
layout = [  [sg.Text('Enter a Command '), sg.InputText()],
            [sg.Button('Ok'), sg.Button('Cancel')] ]

# Create the Window
window = sg.Window('Robo', layout)

while True:
    event, values = window.read()

    if event in (None, 'Cancel'):	# if user closes window or clicks cancel
        break

    import pyttsx3
    engine = pyttsx3.init()

    try:
        wiki_res = wikipedia.summary(values[0], sentences=2)
        res = client.query(values[0])
        wolfram_res = next(res.results).text
        sg.PopupNonBlocking("Request : " + wolfram_res, "Response :" + wiki_res)
        engine.say(wolfram_res)
        engine.say(wiki_res)


    except wikipedia.exceptions.DisambiguationError:
        res = client.query(values[0])
        wolfram_res = next(res.results).text
        sg.PopupNonBlocking("Result : " + wolfram_res)
        engine.say(wolfram_res)


    except wikipedia.exceptions.PageError:
        res = client.query(values[0])
        wolfram_res = next(res.results).text
        sg.PopupNonBlocking("Result : " + wolfram_res)
        engine.say(wolfram_res)


    except:
        wiki_res = wikipedia.summary(values[0], sentences=2)
        sg.PopupNonBlocking("Result : " + wiki_res)
        engine.say(wiki_res)


    engine.runAndWait()


window.close()
