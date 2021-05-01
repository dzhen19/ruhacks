# Get Started with Node.js Sever

...

## Google Cloud Vision API Set Up

This project uses Google Cloud Vision API and therefore needs to go through a quick setup for it.
1. Request the owner to be added to the Service Account
2. Create a new service account key - it can be located via BoxITAPI(project) > Credential > Service Accounts > boxitserviceaccount@boxitapi.iam.gserviceaccount.com > Keys > Add Keys > Create New Keys (do remember to select JSON and keep the downloaded file at a safe spot)
3. Install Google Cloud SDK by following the [link](https://cloud.google.com/sdk/docs/install#deb) (I recommend using Ubuntu)
4. Enter the following command onto your bash/wsl line 
```console
export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH" 
```
5. Then install google cloud vision API via the following command
``` console
npm install --save @google-cloud/vision
```

After finishing with that you should be good to go :)

...
