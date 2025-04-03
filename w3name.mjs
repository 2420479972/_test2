import { create } from '@web3-storage/w3up-client'
import { filesFromPaths } from 'files-from-path'
import fs from "fs"
import os  from 'os';
import path from 'path';
const config ={
  "did":"did:key:z6MkruN5xL5Z3B62iZ22W3WicxkMBkfqf4YbXFo2s9PirgsX",
  "email":"zhang88@tutanota.com"
}
async function main(){
    await removeDir();
    const client = await create()
    console.log("请到邮箱接收邮件,并确认")
    const myAccount = await client.login(config.email)
    while (true) { 
        const res = await myAccount.plan.get()
        if (res.ok) break
        console.log('Waiting for payment plan to be selected...')
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log(222)

      }
    console.log("邮箱确认完毕")  
    let did=config.did
    await myAccount.provision(did)
    await client.setCurrentSpace(did)   
    var files = await filesFromPaths(['dist/'])
    var fss=[]
    for(let i=0;i<files.length;i++){
        let pathFile = files[i];
        fss.push({
            name:pathFile.name.replaceAll("\\","/"),
            stream:pathFile.stream,
            size:pathFile.size
        })
    }
    const root = await client.uploadDirectory(fss)
    removeDir();
    console.log(`https://${root.toString()}.ipfs.dweb.link`)//记住 网关必须要用dweb.link
}



async function removeDir(){
    const homeDir = os.homedir();
    const appDataPath = path.join(homeDir, 'AppData', 'Roaming','w3access');
    if (fs.existsSync(appDataPath)) {
        deleteFolderRecursive(appDataPath);
    }
}

function deleteFolderRecursive(directory) {
    if (fs.existsSync(directory)) {

      fs.readdirSync(directory).forEach((file, index) => {
        const curPath = path.join(directory, file);  
        // 如果当前路径是文件夹，则递归删除该文件夹
        if (fs.lstatSync(curPath).isDirectory()) { 
          deleteFolderRecursive(curPath);
        } else { // 删除文件
          fs.unlinkSync(curPath);
        }
      });
      // 删除文件夹
      fs.rmdirSync(directory);
    }
};


main()




