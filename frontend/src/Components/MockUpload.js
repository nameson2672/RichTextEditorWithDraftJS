import { readFile } from "@draft-js-plugins/drag-n-drop-upload";
import axios from "axios";

/*
 *
 * @name: mockUpload
 * @desc: Custom file upload function. Simulates a file upload.
 * @param {[File], formData} data: consists of an array of files that have been uploaded and a formData object composed of those same files.
 * @param {function([{name: string, src: string}])} success - function to mark a successfull file upload, it takes an array of successfully uploaded files.
 * @param {function({name: string, src?: string})} failed - function that is called to mark a failure to upload one or more files. Removes the upload placeholders.
 * @param {(function(percent:int, file: {name:string, src:string})} progress - function to mark the progress in percentage points. It updates the progress count on each placeholder.
 */
export default function mockUpload(data, success, failed, progress) {
  console.log(data.files)
  //failed(data.files);
  setTimeout(1000);
  if (data.files.length > 1) {
     alert("multiple file cand be uploaded");
     return false;
    
  } 
  else {
    console.log("run2")
    if(data.files[0].src !== undefined){
      success(data.files);
      return true;
    }
    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        progress(percent, data.files[0]);

        console.log(loaded, total, percent);
      },
    };
    let sucess=false;
    let payload = new FormData();
    payload.append("image", data.files[0]);
    axios
      .post("http://localhost:5000/uploadImage", payload, options)
      .then((res) => {
        data.files[0].src = res.data;
        console.log(res.data);
        success(data.files, { retainSrc: true });
        success = true;
      }).catch((err)=>{
        failed(data.files[0]);
        alert("the file upload is failed");
        return false;
        
      });
  }
  
}
