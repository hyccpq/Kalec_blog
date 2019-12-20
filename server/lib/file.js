import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'

let _fsNameObj = {
  __filename: '',
  __dirname: '',
  filePath: ''
}

let _requireConfObj = {
  filePath: ''
}

export const getDirname = meta => {
  if (_fsNameObj.filePath === meta.url) return _fsNameObj

  const __filename = fileURLToPath(meta.url)
  const __dirname = dirname(__filename)

  _fsNameObj = {
    __filename,
    __dirname,
    filePath: meta.url
  }

  return _fsNameObj
}

export const getRequire = meta => {
  if (_requireConfObj.filePath === meta.url) return _requireConfObj

  const require = createRequire(meta.url)
  _requireConfObj = {
    filename: meta.url,
    require
  }
  return _requireConfObj
}
