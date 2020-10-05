using UnityEngine;
using UnityEditor;
using TMPro.EditorUtilities;

[CustomEditor( typeof(TMP_WebGLNativeInputField))]
public class TMP_WebGLNativeInputFieldEditor : TMP_InputFieldEditor
{
    private SerializedProperty m_DialogType;
    private SerializedProperty m_DialogTitle;
    private SerializedProperty m_DialogOkBtn;
    private SerializedProperty m_DialogCancelBtn;
    

    protected override void OnEnable()
    {
        base.OnEnable();
        m_DialogType = serializedObject.FindProperty("m_DialogType");
        m_DialogTitle = serializedObject.FindProperty("m_DialogTitle");
        m_DialogOkBtn = serializedObject.FindProperty("m_DialogOkBtn");
        m_DialogCancelBtn = serializedObject.FindProperty("m_DialogCancelBtn");
    }

    public override void OnInspectorGUI()
    {
        TMP_WebGLNativeInputField dialog = target as TMP_WebGLNativeInputField;
        serializedObject.Update();
        EditorGUILayout.PropertyField(m_DialogType);
        EditorGUILayout.PropertyField(m_DialogTitle);
        if (dialog.m_DialogType == WebGLNativeInputField.EDialogType.OverlayHtml)
        {
            EditorGUILayout.PropertyField(m_DialogOkBtn);
            EditorGUILayout.PropertyField(m_DialogCancelBtn);
        }
        serializedObject.ApplyModifiedProperties();
        base.OnInspectorGUI();
    }
}
