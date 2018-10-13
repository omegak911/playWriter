import fs from 'fs';
import path from 'path';

import { promisify } from 'util';

const writeFileSync = promisify(fs.writeFile);
const readdirSync = promisify(fs.readdir);
const readFileSync = promisify(fs.readFile);

const writeFileCtrl = async (scripts) => { //array of { act: #, scene: #, text: string }

  let order = {
    I: 1,
    II: 2,
    III: 3,
    IV: 4,
    V: 5,
    VI: 6,
    VII: 7,
    VIII: 8,
    IX: 9,
    X: 10
  };

  scripts.sort((a,b) => order[a.act] - order[b.act]);
  let scenes = '';
  let currentAct = scripts[0].act;
  for (let i = 0; i < scripts.length; i++) {
    let script = scripts[i];
    if (currentAct !== script.act || i === scripts.length - 1) {
      if (i === scripts.length - 1) {
        scenes += (JSON.stringify(script) + '\n');
      }
      await writeFileSync(`${pathname}/${currentAct}.txt`, scenes)
      // .then(() => console.log('1'))
      // .catch((err) => console.error(err));
      currentAct = script.act;
      scenes = '';
    }
    scenes += (JSON.stringify(script) + '\n');
  }
}

const readFileCtrl = async () => {
  let scripts = {}
  await readdirSync(pathname)
    .then( async (fileNames) => {
      for (let i = 0; i < fileNames.length; i++) {
        await readFileSync(`${pathname}/${fileNames[i]}`)
          .then((content) => {
            let script = content.toString().split('\n');
            script.pop();
            for (let k = 0; k < script.length; k++) {
              let parsedScene = JSON.parse(script[k]);
              let act = parsedScene.act;
              let scene = parsedScene.scene;
              scripts[act] = scripts[act] || {};
              scripts[act][scene] = scripts[act][scene] || [];
              scripts[act][scene].push(parsedScene.text);
            }
          })
          .catch((err) => console.error(err));
      }
    })
    .catch((err) => console.error(err));
  return scripts;
}

const pathname = path.join(__dirname, '../script');

export default {
  readFileCtrl,
  writeFileCtrl
}