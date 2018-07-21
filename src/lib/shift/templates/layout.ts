/**
 * 渲染 cAppTask
 * @param loopDelay
 * @param setupCode
 * @param loopCode
 */
export function renderLayout(
  loopDelay: number,
  setupCode: string,
  loopCode: string
) {
  return `

#include "cAppTask.h"
#include "parameter.h"
#include "YD-CAN.h"
#include "YD-LIST.h"

/* USER CODE BEGIN I2C task*/

osThreadId cAppTask_Thread;
extern list_t *pDeviceList;

void cAppTask_Fun(void const *argument)
{
  /* USER CODE BEGIN Setup*/
${setupCode}
  /* USER CODE END   Setup*/

  while (1)
  {

    /* USER CODE BEGIN Loop */
${loopCode}
    /* USER CODE END   Loop */

    osDelay(${loopDelay}); //The minimum time delay for other thread
  }
}

void cApp_Task(void)
{

  osThreadDef(cAppTask_Handle, cAppTask_Fun, osPriorityNormal, 0, 256);
  cAppTask_Thread = osThreadCreate(osThread(cAppTask_Handle), NULL);
}

/* USER CODE END cAPP task*/

  `
}
