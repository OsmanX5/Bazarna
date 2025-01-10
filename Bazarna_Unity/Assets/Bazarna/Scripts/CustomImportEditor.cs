using System.Linq;
using UnityEditor;
using UnityEngine;


#if UNITY_EDITOR
public class CustomImportEditor
{
	[MenuItem("Assets/CreateUnLitMaterial")]
	public static void CreateMaterial()
	{
		Debug.Log("CreateMaterial");
		var texture = Selection.activeObject as Texture2D;
		Material mat = new Material(Shader.Find("Universal Render Pipeline/Unlit"));
		mat.mainTexture = texture;
		var  seg = AssetDatabase.GetAssetPath(texture).Split("/");
		var matPath = seg.Take(seg.Length - 1).Aggregate((a, b) => $"{a}/{b}");
		AssetDatabase.CreateAsset(mat, $"{matPath}/{mat.mainTexture.name}.mat");
	}
	[MenuItem("Assets/CreateUnLitMaterialValidation",true)]
	public static bool CreateMaterialValidation()
	{
		return Selection.activeObject is Texture2D;
	}
}
#endif