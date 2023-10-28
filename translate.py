import requests

# Replace 'YOUR_SUBSCRIPTION_KEY' with your actual subscription key
subscription_key = '85ca725d38eb43fab914877f9e567ebd'

# Define the endpoint and path
endpoint = 'https://api.cognitive.microsofttranslator.com'
path = '/translate?api-version=3.0'

# Construct the URL for translation
url = endpoint + path

# Define the text you want to translate
text_to_translate = "Hello, world!"

# Define the target language (e.g., "fr" for French)
target_language = "fr"

# Prepare the request headers
headers = {
    'Ocp-Apim-Subscription-Key': subscription_key,
    'Content-type': 'application/json',
}

# Prepare the request body
body = [{
    'text': text_to_translate
}]

params = {
    'to': target_language
}

# Send the translation request
response = requests.post(url, headers=headers, json=body, params=params)

# Check the response and retrieve the translated text
if response.status_code == 200:
    translation = response.json()
    translated_text = translation[0]['translations'][0]['text']
    print(f"Original text: {text_to_translate}")
    print(f"Translated text: {translated_text}")
else:
    print(f"Translation failed with status code {response.status_code}")
    print(response.text)
