using DG.Tweening;
using System.Collections;
using UnityEngine;

public class FogMovement : MonoBehaviour
{
	void Start()
	{
		StartCoroutine(DoFlare());
	}

	// Update is called once per frame
	void Update()
	{

	}
	IEnumerator DoFlare()
	{
		while (true)
		{
			float t = 10f;
			transform.DOScale(Vector3.one * 0.9f, t);
			yield return new WaitForSeconds(t);
			transform.DOScale(Vector3.one * 1.1f, t);
			yield return new WaitForSeconds(t);
		}
	}
}
