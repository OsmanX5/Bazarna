using System.Collections.Generic;
using UnityEngine;

public class MovementControl : MonoBehaviour
{
	public float speed = 5;

	Rigidbody rigidbody;
	/// <summary> Functions to override movement speed. Will use the last added override. </summary>
	public List<System.Func<float>> speedOverrides = new List<System.Func<float>>();


	void Awake()
	{
		// Get the rigidbody on this.
		rigidbody = GetComponent<Rigidbody>();
	}
	[SerializeField]
	Vector2 targetVelocity;

	void Update()
	{
		// Get targetMovingSpeed.
		float targetMovingSpeed = speed;
		if (speedOverrides.Count > 0)
		{
			targetMovingSpeed = speedOverrides[speedOverrides.Count - 1]();
		}

		// Get targetVelocity from input.
		targetVelocity = new Vector2(0, Input.GetAxis("Mouse ScrollWheel") * targetMovingSpeed);
		
	}

	void FixedUpdate()
	{
		// Apply movement.
		rigidbody.AddForce(transform.rotation * new Vector3(targetVelocity.x, rigidbody.linearVelocity.y, targetVelocity.y));
	}
}
