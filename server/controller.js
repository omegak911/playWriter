import fs from 'fs';
import path from 'path';

import { promisify } from 'util';

const writeFileSync = promisify(fs.writeFile);
const readdirSync = promisify(fs.readdir);
const readFileSync = promisify(fs.readFile);

const writeFileCtrl = async (scripts) => { //scripts = { I: { I: []}, II: { I: []}};
  let order = ['I','II','III','IV','V','VI','VII','VIII','IX','X'];
  let numberOfActs = Object.keys(scripts).length;

  for (let i = 0; i < numberOfActs; i++) { //
    let act = order[i];
    let numberOfScenes = Object.keys(scripts[act]).length;
    for (let k = 0; k < numberOfScenes; k++) {
      let scene = order[k];
      let sceneEntries = scripts[act][scene]; //this is the scene array
      let temp = '';
      for (let j = 0; j < sceneEntries.length; j++) {
        let entry = sceneEntries[j];
        entry.scene = scene;
        temp += (JSON.stringify(entry) + '\n');
      }
      if (k === 0) {
        console.log('0')
        await writeFileSync(`${pathname}/${act}.txt`, temp);
      } else {
        console.log('not 0')
        fs.appendFileSync(`${pathname}/${act}.txt`, temp);
      }
    }
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
              let { scene, text, character } = parsedScene;
              let act = fileNames[i].split('.')[0];
              scripts[act] = scripts[act] || {};
              scripts[act][scene] = scripts[act][scene] || [];
              scripts[act][scene].push({ text, character });
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