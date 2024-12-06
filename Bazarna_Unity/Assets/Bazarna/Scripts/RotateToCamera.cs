using UnityEngine;

public class RotateToCamera : MonoBehaviour
{
    Transform cam => Camera.main.transform;
	void Update()
    {
        Vector3 dir = cam.position - transform.position;
        transform.forward = new Vector3(dir.x, 0, dir.z);
	}
}
