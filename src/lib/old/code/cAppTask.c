
#include "cAppTask.h"
#include "parameter.h"
#include "YD-CAN.h"
#include "YD-LIST.h"

/* USER CODE BEGIN I2C task*/

osThreadId cAppTask_Thread;
extern list_t *pDeviceList;
void cAppTask_Fun(void const *argument)
{
  /* USER CODE BEGIN Variables */
  SlaveDevice d_slider;
  SlaveDevice d_number;
  /* USER CODE END   Variables */

  /* USER CODE BEGIN Setup */

  d_slider.address = 0x10130201;

  d_number.address = 0x20030201;

  /* USER CODE END   Setup */
  while (1)
  {

    /* USER CODE BEGIN Loop */
    d_slider.command = CMD_READ_DATA;
    device_read(&d_slider);

    d_number.data[1] = d_slider.data[1];
    d_number.command = CMD_WRITE_DATA;
    device_write(&d_number);

    osDelay(100);

    /* USER CODE END   Loop */

    osDelay(100); //The minimum time delay for other thread
  }
}

void cApp_Task(void)
{

  osThreadDef(cAppTask_Handle, cAppTask_Fun, osPriorityNormal, 0, 256);
  cAppTask_Thread = osThreadCreate(osThread(cAppTask_Handle), NULL);
}

/* USER CODE END cAPP task*/
