set UV4_HOME="C:\Program Files\Keil\UV4"

del /q .\code\MasterApp\MDK-ARM\Master\capptask*

%UV4_HOME%\UV4.exe -b .\code\MasterApp\MDK-ARM\Master.uvprojx -j0 -o ".\build.log"

