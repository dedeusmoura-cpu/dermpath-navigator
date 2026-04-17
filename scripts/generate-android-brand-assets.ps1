Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$logoPath = Join-Path $root "src\assets\DermpathNavigator.png"
$androidRes = Join-Path $root "android\app\src\main\res"

if (-not (Test-Path $logoPath)) {
  throw "Logo not found at $logoPath"
}

function New-Color($hex) {
  return [System.Drawing.ColorTranslator]::FromHtml($hex)
}

function Save-Png($bitmap, $path) {
  $directory = Split-Path -Parent $path
  if (-not (Test-Path $directory)) {
    New-Item -ItemType Directory -Path $directory | Out-Null
  }
  $tempPath = Join-Path $directory ([System.Guid]::NewGuid().ToString() + ".png")
  try {
    $bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Copy-Item -Path $tempPath -Destination $path -Force
  }
  finally {
    if (Test-Path $tempPath) {
      Remove-Item -Path $tempPath -Force
    }
  }
}

$warmBackground = New-Color "#FFF8EE"
$shadowColor = [System.Drawing.Color]::FromArgb(28, 37, 24, 51)

$logoBitmap = [System.Drawing.Bitmap]::FromFile($logoPath)

try {
  $symbolCropSize = $logoBitmap.Height
  $symbolCrop = New-Object System.Drawing.Rectangle(0, 0, $symbolCropSize, $symbolCropSize)

  $iconTargets = Get-ChildItem -Path $androidRes -Recurse -File | Where-Object {
    $_.Name -in @("ic_launcher.png", "ic_launcher_round.png", "ic_launcher_foreground.png")
  }

  foreach ($target in $iconTargets) {
    $existing = [System.Drawing.Image]::FromFile($target.FullName)
    try {
      [int]$width = $existing.Width
      [int]$height = $existing.Height
    }
    finally {
      $existing.Dispose()
    }

    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    try {
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

      if ($target.Name -eq "ic_launcher_foreground.png") {
        $graphics.Clear([System.Drawing.Color]::Transparent)
      } else {
        $graphics.Clear($warmBackground)
      }

      $margin = [int]($width * 0.13)
      $drawWidth = [int]($width - ($margin * 2))
      $drawHeight = [int]($height - ($margin * 2))
      $drawRect = New-Object System.Drawing.Rectangle -ArgumentList $margin, $margin, $drawWidth, $drawHeight

      if ($target.Name -ne "ic_launcher_foreground.png") {
        $shadowMargin = [int]($width * 0.07)
        $shadowX = [int]$shadowMargin
        $shadowY = [int]($shadowMargin + [int]($height * 0.03))
        $shadowWidth = [int]($width - ($shadowMargin * 2))
        $shadowHeight = [int]($height - ($shadowMargin * 2))
        $shadowRect = New-Object System.Drawing.Rectangle -ArgumentList $shadowX, $shadowY, $shadowWidth, $shadowHeight
        $shadowBrush = New-Object System.Drawing.SolidBrush($shadowColor)
        try {
          $graphics.FillEllipse($shadowBrush, $shadowRect)
        } finally {
          $shadowBrush.Dispose()
        }
      }

      $graphics.DrawImage($logoBitmap, $drawRect, $symbolCrop, [System.Drawing.GraphicsUnit]::Pixel)
      Save-Png $bitmap $target.FullName
    }
    finally {
      $graphics.Dispose()
      $bitmap.Dispose()
    }
  }

  $splashTargets = Get-ChildItem -Path $androidRes -Recurse -Filter "splash.png" -File

  foreach ($target in $splashTargets) {
    $existing = [System.Drawing.Image]::FromFile($target.FullName)
    try {
      [int]$width = $existing.Width
      [int]$height = $existing.Height
    }
    finally {
      $existing.Dispose()
    }

    $bitmap = New-Object System.Drawing.Bitmap($width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    try {
      $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
      $graphics.Clear($warmBackground)

      $maxLogoWidth = [int]($width * 0.74)
      $maxLogoHeight = [int]($height * 0.24)
      [double]$logoRatio = $logoBitmap.Width / $logoBitmap.Height

      $drawWidth = $maxLogoWidth
      $drawHeight = [int]($drawWidth / $logoRatio)

      if ($drawHeight -gt $maxLogoHeight) {
        $drawHeight = $maxLogoHeight
        $drawWidth = [int]($drawHeight * $logoRatio)
      }

      $x = [int](($width - $drawWidth) / 2)
      $y = [int](($height - $drawHeight) / 2)
      $drawRect = New-Object System.Drawing.Rectangle -ArgumentList $x, $y, $drawWidth, $drawHeight

      $graphics.DrawImage($logoBitmap, $drawRect)
      Save-Png $bitmap $target.FullName
    }
    finally {
      $graphics.Dispose()
      $bitmap.Dispose()
    }
  }
}
finally {
  $logoBitmap.Dispose()
}

Write-Host "Android icon and splash assets generated successfully."
