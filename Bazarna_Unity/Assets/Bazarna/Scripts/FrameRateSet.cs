using Unity.VisualScripting;
using UnityEngine;

public class FrameRateSet : MonoBehaviour
{
    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start()
    {
        Application.targetFrameRate = 60;
    }

	// Update is called once per frame
	void Update()
    {
		Application.ExternalEval($"console.log('hello{1.0f / Time.deltaTime }')");
	}
}
