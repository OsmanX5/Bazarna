using UnityEditor;
using UnityEngine;
#if UNITY_EDITOR
public class spriteRendrerToQuad : MonoBehaviour
{
    static string matPath = "Assets/Bazarna/Assets/Materials";

	[MenuItem("CONTEXT/SpriteRenderer/Create Quad")]
	public static void convert(MenuCommand command)
    {
        SpriteRenderer spriteRenderer = command.context as SpriteRenderer;
        var bounds = spriteRenderer.bounds;
        var size = bounds.size; 
        var matrix = spriteRenderer.transform.localToWorldMatrix;
        Debug.Log($"Bounds: {bounds}");
        Debug.Log($"Size: {size}");
		Debug.Log($"Matrix: {matrix}");
        var go = GameObject.CreatePrimitive(PrimitiveType.Quad);
		go.transform.position = bounds.center;
		go.transform.localScale = size;
		go.transform.rotation = spriteRenderer.transform.rotation;
		go.transform.parent = spriteRenderer.transform.parent;
        go.name = spriteRenderer.name;
        
        Material mat = new Material(Shader.Find("Universal Render Pipeline/Unlit"));
		mat.mainTexture = spriteRenderer.sprite.texture;
        
        AssetDatabase.CreateAsset(mat, $"{matPath}/{mat.mainTexture.name}.mat");
		go.GetComponent<MeshRenderer>().material = mat;
		spriteRenderer.gameObject.SetActive(false);
	}
}
#endif  