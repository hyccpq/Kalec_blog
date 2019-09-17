import {FileManage} from "../service/fileManage";
import {deleteOneGallery} from "../service/getAdminGallery";

export const testMain = async app => {
    // let fileManage = new FileManage();
    // let resList = await fileManage.getFileList(20);
    // console.log(resList)
    // let res = await fileManage.deleteListFile([resList[0].key, resList[1].key], 'myupload');
    // console.log(res)
    deleteOneGallery('5b8817fedb76b4625139512a');
}
