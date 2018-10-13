﻿var WebNativeDialog = {
  NativeDialogPrompt:function (title , defaultValue){
    defaultValue = Pointer_stringify(defaultValue);
    title = Pointer_stringify(title);
    var result = window.prompt( title , defaultValue );
    if( !result ){
      result = defaultValue;
    }
    var bufferSize = lengthBytesUTF8(result) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(result, buffer, bufferSize);
    return buffer;
  },
  SetupOverlayDialogHtml:function(title,defaultValue,okBtnText,cancelBtnText){
    title = Pointer_stringify(title);
    defaultValue = Pointer_stringify(defaultValue);
    okBtnText = Pointer_stringify(okBtnText);
    cancelBtnText = Pointer_stringify(cancelBtnText);

    if( !document.getElementById("nativeInputDialogInput" ) ){
      // setup css
      var style = document.createElement( 'style' );
      style.setAttribute('id' , 'inputDialogTextSelect');
      style.appendChild( document.createTextNode( '#nativeInputDialogInput::-moz-selection { background-color:#00ffff;}' ) );
      style.appendChild( document.createTextNode( '#nativeInputDialogInput::selection { background-color:#00ffff;}' ) );
      document.head.appendChild( style );
    }
    if( !document.getElementById("nativeInputDialog" ) ){
      // setup html
      var html = '<div id="nativeInputDialog" style="background:#000000;opacity:0.9;width:100%;height:100%;position:fixed;top:0%;z-index:2147483647;">' + 
               '  <div style="position:relative;top:30%;" align="center" vertical-align="middle">' + 
               '    <div id="nativeInputDialogTitle" style="color:#ffffff;">Here is title</div>' + 
               '    <div>' + 
               '      <input id="nativeInputDialogInput" type="text" size="40" onsubmit="">' + 
               '    </div>' + 
               '    <div style="margin-top:10px">' + 
               '      <input id="nativeInputDialogOkBtn" type="button" value="OK" onclick="" >' + 
               '      <input id="nativeInputDialogCancelBtn" type="button" value="Cancel" onclick ="">' + 
               '      <input id="nativeInputDialogCheck" type="checkBox" style="display:none;">' + 
               '    </div>' + 
               '  </div>' + 
               '</div>';
      var element = document.createElement('div');
      element.innerHTML = html;
      // write to html
      document.body.appendChild( element );

      // set Event
      var okFunction = 
        'document.getElementById("nativeInputDialog" ).style.display = "none";' + 
        'document.getElementById("nativeInputDialogCheck").checked = false;' +
        'var canvasElm = document.getElementById("canvas");' +
        'if (canvasElm) { canvasElm.style.display=""; }'; // canvasが存在するなら
      var cancelFunction = 
        'document.getElementById("nativeInputDialog" ).style.display = "none";' +
        'document.getElementById("nativeInputDialogCheck").checked = true;' +
        'var canvasElm = document.getElementById("canvas");' +
        'if (canvasElm) { canvasElm.style.display=""; }'; // canvasが存在するなら

      var inputField = document.getElementById("nativeInputDialogInput");
      inputField.setAttribute( "onsubmit" , okFunction );
      var okBtn = document.getElementById("nativeInputDialogOkBtn");
      okBtn.setAttribute( "onclick" , okFunction );
      var cancelBtn = document.getElementById("nativeInputDialogCancelBtn");
      cancelBtn.setAttribute( "onclick" , cancelFunction );
    }
    document.getElementById("nativeInputDialogTitle").innerText = title;
    document.getElementById("nativeInputDialogInput").value= defaultValue;

    document.getElementById("nativeInputDialogOkBtn").value = okBtnText;
    document.getElementById("nativeInputDialogCancelBtn").value = cancelBtnText;
    document.getElementById("nativeInputDialog" ).style.display = "";
  },
  HideUnityScreenIfHtmlOverlayCant:function(){
    var canvasElm = document.getElementById("canvas");
    if (canvasElm && navigator.userAgent.indexOf("Chrome/") < 0 ){
      canvasElm.style.display="none";
    }
  },
  IsRunningOnEdgeBrowser:function(){
    if( navigator.userAgent.indexOf("Edge/") < 0 ){
      return false;
    }
    return true;
  },
  IsOverlayDialogHtmlActive:function(){
    var nativeDialog = document.getElementById("nativeInputDialog" );
    if( !nativeDialog ){
      return false;
    }
    return ( nativeDialog.style.display != 'none' );
  },
  IsOverlayDialogHtmlCanceled:function(){
    var check = document.getElementById("nativeInputDialogCheck");
    if( !check ){ return false; }
    return check.checked;
  },
  GetOverlayHtmlInputFieldValue:function(){
    var inputField = document.getElementById("nativeInputDialogInput");
    var result = "";
    if( inputField && inputField.value ){
      result = inputField.value;
    }
    var bufferSize = lengthBytesUTF8(result) + 1;
    var buffer = _malloc(bufferSize);
    stringToUTF8(result, buffer, bufferSize);
    return buffer;
  }

};
mergeInto( LibraryManager.library , WebNativeDialog );

