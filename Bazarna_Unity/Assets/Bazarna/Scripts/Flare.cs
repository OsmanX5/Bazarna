using DG.Tweening;
using System.Collections;
using UnityEngine;

public class Flare : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
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
            float t = 2f;
            transform.DOScale(Vector3.one * 0.8f, t);
            yield return new WaitForSeconds(t);
            transform.DOScale(Vector3.one * 2f, t);
            yield return new WaitForSeconds(t);
        }
	}
}
