#include "cAppTask.h"

osThreadId cI2C_Thread_Task1;

typedef struct Node{
    int inputs[20];
    int outputs[20];
}Node;

void cI2C_Task1Fun(void const * argument){
    Device_DataType param;

    Node node0;
    Node node1;
    Node node2;
    Node node3;

    while(1) {
        // RGBNode device_write
        node0.inputs[0] = node2.outputs[0];
        param.address = 0x16010101;
        param.command = 0;
        param.value = node0.inputs[0];
        device_write(&param);

        // SwitchNode device_read
        param.address = 0x17010101;
        param.command = 0x40;
        param.value = 0;
        device_read(&param);
        node1.outputs[0] = param.value;

        // AndPatch
        node2.inputs[0] = node1.outputs[0];
        node2.inputs[1] = node3.outputs[0];
        node2.outputs[0] = node2.inputs[0] & node2.inputs[1];

        // SwitchNode device_read
        param.address = 0x17010102;
        param.command = 0x40;
        param.value = 0;
        device_read(&param);
        node3.outputs[0] = param.value;

        osDelay(1000);

        osDelay(100);
    }
}

void cI2C_Task1(void) {
    osThreadDef(cI2C_Handle_Task1, cI2C_Task1Fun, osPriorityNormal, 0, 256);
    cI2C_Thread_Task1 = osThreadCreate(osThread(cI2C_Handle_Task1), NULL);
}

void cI2C_Task(void) {
    cI2C_Task1();
}

