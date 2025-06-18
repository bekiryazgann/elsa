const { app, BrowserWindow, session } = require("electron");

const title = "Elsa Win Şema Sente Programı";

function createWindow() {
   const win = new BrowserWindow({
      width: 1366,
      height: 768,
      webPreferences: {
         nodeIntegration: false,
         contextIsolation: true,
      },
   });

   win.loadURL("https://superetka.com/elsa/");
   win.setTitle(title);
   win.webContents.on("did-finish-load", () => {
      win.setTitle(title);
   });

   win.setMenuBarVisibility(false);

   const filter = {
      urls: [
         "*://*.doubleclick.net/*",
         "*://*.googlesyndication.com/*",
         "*://*.adservice.google.com/*",
         "*://*.adsafeprotected.com/*",
         "*://*.advertising.com/*",
         "*://*.adnxs.com/*",
         "*://*.rubiconproject.com/*",
      ],
   };

   session.defaultSession.webRequest.onBeforeRequest(
      filter,
      (details, callback) => {
         callback({ cancel: true });
      },
   );

   win.webContents.on("did-finish-load", () => {
      win.webContents.insertCSS(`
      @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
      * {
        font-family: "Inter", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400; // CSS ağırlığını güncelledik
        font-style: normal;
      }
      /* body {
        background-color: lightblue !important;
      }*/

      body .vlogin{
        opacity: 0 !important;
        visibility: hidden !important;
      }
      .vlogin .help {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      #showReg {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      .hide {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      .time1Over {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
      .noContent h3 {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
      }
    `);

      win.webContents
         .executeJavaScript(
            `
      document.querySelectorAll('[id^="ad"], .advertisement, .adsbygoogle').forEach(ad => ad.style.display = 'none');

      const username = document.querySelector(".vlogin input[name='lgn']");
      const password = document.querySelector(".vlogin input[name='pwd']");
      const button = document.querySelector("button[name='go']");

      if (username) {
        username.value = "yazganebubekir4@gmail.com";
      }
      if (password) {
        password.value = "1234";
      }
      if (button) {
        button.click()
      }

      const divs = document.querySelectorAll(".winPanel div")
      divs.forEach(div => {
        if(div.textContent === 'https://superetka.com/elsa'){
            div.innerHTML = ""
            console.log(div)
        }
      })

      const translateDiv = document.createElement('div');
      translateDiv.id = 'google_translate_element2';
      document.body.appendChild(translateDiv);

      const translateScript = document.createElement('script');
      translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2';
      document.head.appendChild(translateScript);

      window.googleTranslateElementInit2 = function() {
        new google.translate.TranslateElement({
          pageLanguage: 'auto',
          autoDisplay: true,
          includedLanguages: 'tr',
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          multilanguagePage: true,
          defaultLanguage: 'tr'
        }, 'google_translate_element2');
      };

      window.GTranslateFireEvent = function(a,b) {
        try {
          if(document.createEvent) {
            var c = document.createEvent("HTMLEvents");
            c.initEvent(b,true,true);
            a.dispatchEvent(c);
          } else {
            var c = document.createEventObject();
            a.fireEvent('on'+b,c);
          }
        } catch(e) {}
      };

      window.doGTranslate = function(a) {
        if(a.value) a = a.value;
        if(a=='') return;
        var b = a.split('|')[1];
        var c;
        var d = document.getElementsByTagName('select');
        for(var i=0;i<d.length;i++)
          if(d[i].className=='goog-te-combo')
            c=d[i];
        if(document.getElementById('google_translate_element2')==null||document.getElementById('google_translate_element2').innerHTML.length==0||c.length==0||c.innerHTML.length==0) {
          setTimeout(function(){doGTranslate(a)},500);
        } else {
          c.value=b;
          GTranslateFireEvent(c,'change');
          GTranslateFireEvent(c,'change');
        }
      };

      const translateElement = document.getElementById('google_translate_element2');
      if (translateElement) {
        translateElement.style.position = 'fixed';
        translateElement.style.top = '10px';
        translateElement.style.right = '10px';
        translateElement.style.zIndex = '9999';
      }

      translateScript.onload = function() {
        setTimeout(function() {
          const combo = document.querySelector('.goog-te-combo');
          if (combo) {
            combo.value = 'tr';
            GTranslateFireEvent(combo, 'change');
          }
        }, 1000);
      };
    `,
         )
         .catch((err) => console.error("JavaScript execution error:", err));
   });
}

app.whenReady().then(() => {
   createWindow();

   app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
         createWindow();
      }
   });
});

app.on("window-all-closed", () => {
   if (process.platform !== "darwin") {
      app.quit();
   }
});
