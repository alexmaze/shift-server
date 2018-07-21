/**
 * 渲染 cAppTask.h 文件
 * @param custom
 */
export function renderH(custom: string) {
  return `
/**
 ****************************************************************

File		:	main.h
Author	:	@hiyangdong
Version	:	V1.0
date		:	2015-05-19 19:04:20
brief		:	main header

*****************************************************************
*/

#ifndef _CAPPTASK_H_
#define _CAPPTASK_H_

#include <stdbool.h>
#include <string.h>

#include "stm32f1xx_hal.h"
#include "FreeRTOS.h"
#include "task.h"
#include "cmsis_os.h"


typedef struct DeviceStruct
{
  uint32_t address;
  int8_t 	 status;
  uint8_t  command;
  uint8_t	 data[8];
}SlaveDevice;

extern void cApp_Task(void);

/* USER DEFINE START */

${custom}

/* USER DEFINE END */

#endif
`
}
