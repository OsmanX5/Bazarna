
using NUnit.Framework;
using System;
using System.Collections.Generic;
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
	GameObject canvas;
	private void Awake()
	{
		canvas = GameObject.Find("ProductCanvas");
	}
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
		if (canvas.activeSelf)
		{
			return;
		}
		if (state == State.Panning)
		{
			Vector2 value = mouseDelta.action.ReadValue<Vector2>();
			Vector3 move = new Vector3(-value.x, -value.y,0) * panSpeed * Time.deltaTime;
			Cam.Translate(move);
		}
		else if (state == State.Rotating)
		{
			Vector2 value = mouseDelta.action.ReadValue<Vector2>();
			Vector3 move = new Vector3(-value.y, value.x, 0) * rotateSpeed * Time.deltaTime;
			Cam.Rotate(Vector3.up,move.y,Space.Self);
			Cam.Rotate(Vector3.right, move.x,Space.Self);
			Vector3 euler = Cam.rotation.eulerAngles;
			euler.z = 0;
			Cam.rotation = Quaternion.Euler(euler);
		}
		Vector2 moveInOut = cameraMoveInOut.action.ReadValue<Vector2>();
		float moveVal = moveInOut.y;
		Vector3 forward= Cam.forward;
		forward.y = 0;
		if (moveVal > 0 && IsTherColliderInfront())
		{
			Debug.Log("we will not move ther collider in front");
			return;
		}
		if(moveVal < 0 && IsThereColliderInBack())
		{
			Debug.Log("we will not move ther collider in back");
			return;
		}
		Cam.Translate(forward * moveVal * speedMultiplier * Time.deltaTime,Space.World);
	}
	[SerializeField]
	List<string> collided = new();

	bool IsTherColliderInfront()
	{
		Vector3 forward = Cam.forward;
		forward.y = 0;
		Ray ray = new Ray(Cam.position, forward);
		Physics.Raycast(ray, out RaycastHit hitInfo,1f);
		if(hitInfo.collider == null)
			return false;
		string collidedName= hitInfo.collider.name;
		if(!collided.Contains(collidedName))
			collided.Add(collidedName);
		return true;
	}
	bool IsThereColliderInBack()
	{
		Vector3 forward =- Cam.forward;
		forward.y = 0;
		Ray ray = new Ray(Cam.position, forward);
		Physics.Raycast(ray, out RaycastHit hitInfo, 1f);
		if (hitInfo.collider == null)
			return false;
		string collidedName = hitInfo.collider.name;
		if (!collided.Contains(collidedName))
			collided.Add(collidedName);
		return true;
	}
	
	private void OnCameraMoveInOut(InputAction.CallbackContext context)
	{
		
	}

	enum State
	{
		None,
		Panning,
		Rotating
	}
}