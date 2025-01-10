using System;
using UnityEngine;
using UnityEngine.UI;

public class ProductVase : MonoBehaviour
{
    [SerializeField]
    Button buyButton;
    [SerializeField]
    Button viewButton;

	GameObject canvas;
	private void Awake()
	{
		canvas = GameObject.Find("ProductCanvas");
	}
	void Start()
	{
		buyButton.onClick.AddListener(Buy);
		viewButton.onClick.AddListener(View);
		if(canvas != null)
		{
			canvas.SetActive(false);
		}
	}

	private void View()
	{
		if(canvas != null)
			canvas.SetActive(true);
	}

	private void Buy()
	{
		Debug.Log("buy");
	}
}
