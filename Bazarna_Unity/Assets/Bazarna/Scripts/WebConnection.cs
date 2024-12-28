using System.Runtime.InteropServices;
using UnityEngine;

public class WebConnection : MonoBehaviour
{
	float t = 0;
	private void Update()
	{
		t+= Time.deltaTime;
		if (t>5)
		{
			t = 0;
			addProduct(Random.Range(0, 100));
		}
	}
	public void addProduct(int productId)
	{
		Application.ExternalEval($"addProduct({productId})");
	}
}
