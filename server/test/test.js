import {FileManage} from "../service/fileManage";
import * as gallery from "../service/getAdminGallery";
import {checkGalleryPassword} from "../service/getGalleryInfo";

export const testMain = async app => {
    // let fileManage = new FileManage();
    // let resList = await fileManage.getFileList(20);
    // console.log(resList)
    // let res = await fileManage.deleteListFile([resList[0].key, resList[1].key], 'myupload');
    // console.log(res)
    // deleteOneGallery('5b8817fedb76b4625139512a');
    // delOneImage('5b8a1030385310084c91467d', '5cb832dc33700480f888228a')
    // setCoverImage('5b8a1030385310084c91467d', 'pLWC4LjOFSy_fIvsQJnQS')
    await gallery.savedGallery('5b8a1030385310084c91467d','旅大改', 'hyccpq', '哈哈哈哈哈牛x，爽的一笔', '1234')
    checkGalleryPassword('5b8a1030385310084c91467d', '1234')
}
