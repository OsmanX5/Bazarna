using UnityEngine;
using UnityEngine.Events;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class OnHover : MonoBehaviour, IPointerEnterHandler,IPointerExitHandler
{
	public UnityEvent onHover = new UnityEvent();
	public UnityEvent onHoverExit = new UnityEvent();
	public void OnPointerEnter(PointerEventData eventData)
	{
		Debug.Log("OnPointerEnter");
		onHover?.Invoke();
	}

	public void OnPointerExit(PointerEventData eventData)
	{
		Debug.Log("OnPointerExit");
		onHoverExit?.Invoke();
	}
}
