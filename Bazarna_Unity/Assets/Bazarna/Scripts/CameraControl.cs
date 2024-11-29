using System;
using UnityEngine;
using UnityEngine.InputSystem;

public class CameraControl : MonoBehaviour
{
	[SerializeField]
	InputActionReference cameraMoveInOut;

	[SerializeField] 
	InputActionReference PanAction;
	[SerializeField]
	InputActionReference rotateAction;

	[SerializeField]
	InputActionReference mouseDelta;

	[SerializeField]
	float speedMultiplier = 1f;

	[SerializeField]
	float panSpeed = 1f;

	[SerializeField]
	float rotateSpeed = 1f;


	[SerializeField]
	Transform Cam => transform;

	[SerializeField]
	State state = State.None;
	private void OnEnable()
	{
		Debug.Log("CameraControl.OnEnable");
		cameraMoveInOut.action.Enable();
		cameraMoveInOut.action.performed += OnCameraMoveInOut;
		PanAction.action.Enable();
		PanAction.action.performed += OnPan;
		PanAction.action.canceled += OnPanCanceled;
		rotateAction.action.Enable();
		rotateAction.action.performed += OnRotate;
		rotateAction.action.canceled += OnRotateCanceled;

		mouseDelta.action.Enable();
	}

	private void OnRotateCanceled(InputAction.CallbackContext context)
	{
		state = State.None;
	}

	private void OnRotate(InputAction.CallbackContext context)
	{
		state = State.Rotating;
	}

	private void OnPanCanceled(InputAction.CallbackContext context)
	{
		Debug.Log("CameraControl.OnPanCanceled");
		state = State.None;
	}

	private void OnPan(InputAction.CallbackContext context)
	{
		Debug.Log("CameraControl.OnPan");
		state = State.Panning;
	}
	private void Update()
	{
		if(state == State.Panning)
		{
			Vector2 value = mouseDelta.action.ReadValue<Vector2>();
			Vector3 move = new Vector3(value.x, value.y,0) * panSpeed * Time.deltaTime;
			Cam.Translate(move);
		}
		else if (state == State.Rotating)
		{
			Vector2 value = mouseDelta.action.ReadValue<Vector2>();
			Vector3 move = new Vector3(-value.y, value.x, 0) * rotateSpeed * Time.deltaTime;
			Cam.Rotate(move);
		}
	}
	private void OnCameraMoveInOut(InputAction.CallbackContext context)
	{
		Vector2 value = context.ReadValue<Vector2>();
		float moveVal = value.y;
		Cam.Translate(Vector3.forward * moveVal * speedMultiplier);
	}

	enum State
	{
		None,
		Panning,
		Rotating
	}
}
