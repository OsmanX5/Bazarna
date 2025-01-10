using UnityEngine;

public class RotateToCamera : MonoBehaviour
{
    [SerializeField]
    bool mirror;
    Transform cam => Camera.main.transform;
	void Update()
    {
        Vector3 dir = cam.position - transform.position;
        if(mirror) 
            dir = -dir;
        transform.forward = new Vector3(dir.x, 0, dir.z);
	}
}
