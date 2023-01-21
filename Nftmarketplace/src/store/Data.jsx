import {createGlobalState } from "react-hooks-global-state"
const { setGlobalState, useGlobalState, getGlobalState} = createGlobalState ({
    modal: 'scale-0',
    showNft: 'scale-0',
    updateModal: 'scale-0',
    loader: {show: false, msg: '' },
    alert: {show: false, msg: '' , color: ''},
    contract: null,
    connectedAccount: '',
    nft: null,
    nfts: [],
    transactions: [],
    
 
})
const setAlert = (msg, color= 'green') =>{
  setGlobalState('loader', {show: false, msg:''})
  setGlobalState('alert', { show: true, msg, color})
  setTimeout(()=> {
    setGlobalState('alert', { show: false, msg, color})
  },6000)
}

const setLoadingMsg = (msg) => {
  setGlobalState('loader', { show: true, msg})
}

const slice = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars)
    var end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}
export {
    useGlobalState,
    setGlobalState,
    getGlobalState,
    setLoadingMsg,
    setAlert,
    slice,
}
