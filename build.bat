set UV4_HOME="C:\Keil\UV4"
set ARMCC_BIN="C:\Keil\ARM\ARMCC\bin"

set WORK_DIR="C:\Users\Alex\Desktop\cdi\smartnoderYth\Master\MasterApp\MDK-ARM\Master"

del /q %WORK_DIR%\capptask*
del /q  %WORK_DIR%\Master.axf
del /q  %WORK_DIR%\Master.bin

%UV4_HOME%\UV4.exe -b  %WORK_DIR%\Master.uvprojx -j0 -o ".\build.log"
:%ARMCC_BIN%\fromelf --bin -o Master.bin  %WORK_DIR%/Master.axf
