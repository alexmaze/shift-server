REM set UV4_HOME="C:\Keil\UV4"
REM set ARMCC_BIN="C:\Keil\ARM\ARMCC\bin"

REM set WORK_DIR="C:\Users\Alex\Desktop\cdi\smartnoderYth\Master\MasterApp\MDK-ARM\Master"

REM del /q %WORK_DIR%\capptask*
REM del /q  %WORK_DIR%\Master.axf
REM del /q  %WORK_DIR%\Master.bin

REM %UV4_HOME%\UV4.exe -b  %WORK_DIR%\Master.uvprojx -j0 -o ".\build.log"
REM :%ARMCC_BIN%\fromelf --bin -o Master.bin  %WORK_DIR%/Master.axf


cd C:\Users\Alex\Desktop\cdi\smartnoderYth\Master\MasterApp\MDK-ARM

del /q .\Master\Master.axf
del /q .\Master.bin
del /q .\build.log

UV4.exe -b  .\Master.uvprojx -j0 -o ".\build.log"
fromelf --bin -o Master.bin  ./Master/Master.axf
