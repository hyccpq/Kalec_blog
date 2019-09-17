import {FileManage} from "../service/fileManage";

export const testMain = async app => {
    let fileManage = new FileManage();
    let res = await fileManage.getFileList(20);
    console.log(res)
}
