using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using TMPro;
using UnityEngine.EventSystems;

public class TMP_WebGLNativeInputField : TMP_InputField
{
    public string m_DialogTitle = "Input Text";
    public string m_DialogOkBtn = "OK";
    public string m_DialogCancelBtn = "Cancel";
    public WebGLNativeInputField.EDialogType m_DialogType = WebGLNativeInputField.EDialogType.OverlayHtml;

#if UNITY_WEBGL && !UNITY_EDITOR

    public override void OnSelect(BaseEventData eventData)
    {
        switch( m_DialogType ){
            case WebGLNativeInputField.EDialogType.PromptPopup:
                this.text = WebNativeDialog.OpenNativeStringDialog(m_DialogTitle, this.text);
                StartCoroutine(this.DelayInputDeactive());
                break;
            case WebGLNativeInputField.EDialogType.OverlayHtml:
                WebNativeDialog.SetUpOverlayDialog(m_DialogTitle, this.text , m_DialogOkBtn , m_DialogCancelBtn );
                StartCoroutine(this.OverlayHtmlCoroutine());
                break;
        }
    }
    private IEnumerator DelayInputDeactive()
    {
        yield return new WaitForEndOfFrame();
        this.DeactivateInputField();
        EventSystem.current.SetSelectedGameObject(null);
    }

    private IEnumerator OverlayHtmlCoroutine()
    {
        yield return new WaitForEndOfFrame();
        this.DeactivateInputField();
        EventSystem.current.SetSelectedGameObject(null);
        WebGLInput.captureAllKeyboardInput = false;
        while (WebNativeDialog.IsOverlayDialogActive())
        {
            yield return null;
        }
        WebGLInput.captureAllKeyboardInput = true;

        if (!WebNativeDialog.IsOverlayDialogCanceled())
        {
            this.text = WebNativeDialog.GetOverlayDialogValue();
        }
    }
    
#endif
}
