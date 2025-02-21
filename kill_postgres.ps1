# Check if running as administrator
if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
  Write-Output "Restarting script as Administrator..."
  Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
  exit  # <-- This ensures the non-elevated instance exits
}

# Script logic: Kill the first two postgres processes
$postgresPIDs = (Get-Process | Where-Object { $_.Name -like "postgres" } | Select-Object -First 2 -ExpandProperty Id)
if ($postgresPIDs.Count -gt 0) {
  foreach ($processId in $postgresPIDs) {
    Write-Output "Killing process with PID: $processId"
    try {
      Stop-Process -Id $processId -Force -ErrorAction Stop
      Write-Output "Successfully killed process with PID: $processId"
    } catch {
      Write-Error "Failed to kill process with PID: $processId. Error: $_"
    }
  }
} else {
  Write-Output "No postgres processes found."
}

exit
