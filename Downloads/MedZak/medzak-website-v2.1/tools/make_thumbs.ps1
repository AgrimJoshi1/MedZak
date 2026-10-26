<#
  Makes the smaller image variants the pages use in `srcset`, with no extra software (Windows PowerShell
  + the built-in System.Drawing). Originals are never touched; variants go to assets/images/thumbs/.

      powershell -ExecutionPolicy Bypass -File tools\make_thumbs.ps1          # make what is missing
      powershell -ExecutionPolicy Bypass -File tools\make_thumbs.ps1 -Force   # redo everything

  Naming:  thumbs/<folder>-<name>-<width>.jpg  (gallery, achievements, media)
           thumbs/<name>-<width>.jpg|png       (top-level images)
  A variant is only written when the original is wider than the target width (a small PNG photo is re-encoded as JPEG at its own width).
  JPEG quality 76; EXIF orientation is applied (the variant carries no EXIF, so it displays upright).
#>
param([switch]$Force)

Add-Type -AssemblyName System.Drawing
$site = Split-Path -Parent $PSScriptRoot
$images = Join-Path $site 'assets\images'
$out = Join-Path $images 'thumbs'
New-Item -ItemType Directory -Force $out | Out-Null
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
$jpegParams = New-Object System.Drawing.Imaging.EncoderParameters 1
$jpegParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]76)

# folder or file -> widths
$jobs = @(
    @{ Path = 'gallery';      Widths = 480, 800; Prefix = 'gallery-' },
    @{ Path = 'achievements'; Widths = 480, 800; Prefix = 'achievements-' },
    @{ Path = 'media';        Widths = 480, 800; Prefix = 'media-' },
    @{ Path = 'hero-eye.jpg';           Widths = 640, 1000; Prefix = '' },
    @{ Path = 'metabo-x.jpg';           Widths = 480, 800;  Prefix = '' },
    @{ Path = 'metabo-x-product.jpg';   Widths = 560;       Prefix = '' },
    @{ Path = 'logo.png';               Widths = 320;       Prefix = '' },
    @{ Path = 'supporter-birac.jpg';        Widths = 240; Prefix = '' },
    @{ Path = 'supporter-winer.jpg';        Widths = 240; Prefix = '' },
    @{ Path = 'supporter-nidhi-prayas.jpg'; Widths = 240; Prefix = '' },
    @{ Path = 'supporter-meity.jpg';        Widths = 240; Prefix = '' },
    @{ Path = 'supporter-dsir.jpg';         Widths = 240; Prefix = '' },
    @{ Path = 'supporter-rich.jpg';         Widths = 240; Prefix = '' }
)

function Save-Variant($file, $width, $prefix, $first) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($file.Name)
    $isPng = $file.Extension -ieq '.png' -and $file.Directory.Name -eq 'images'   # only the logo keeps transparency
    $ext = if ($isPng) { 'png' } else { 'jpg' }
    $dest = Join-Path $out ("{0}{1}-{2}.{3}" -f $prefix, $name, $width, $ext)
    if ((Test-Path $dest) -and -not $Force) { return $null }
    $img = [System.Drawing.Image]::FromFile($file.FullName)
    try {
        if ($img.Width -le $width) {
            # a small PNG photo is still re-encoded as a JPEG at its own width (the smallest target only)
            if ($file.Extension -ieq '.png' -and -not $isPng -and $width -eq $first) { $width = $img.Width; $dest = Join-Path $out ('{0}{1}-{2}.jpg' -f $prefix, $name, $width); if ((Test-Path $dest) -and -not $Force) { return $null } } else { return $null }
        }
        # apply EXIF orientation so the variant is upright without metadata
        $o = 1
        if ($img.PropertyIdList -contains 0x0112) { $o = [int]$img.GetPropertyItem(0x0112).Value[0] }
        switch ($o) { 3 { $img.RotateFlip('Rotate180FlipNone') } 6 { $img.RotateFlip('Rotate90FlipNone') } 8 { $img.RotateFlip('Rotate270FlipNone') } }
        $h = [int][math]::Round($img.Height * $width / $img.Width)
        $bmp = New-Object System.Drawing.Bitmap $width, $h, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($bmp)
        $g.InterpolationMode = 'HighQualityBicubic'; $g.SmoothingMode = 'HighQuality'; $g.PixelOffsetMode = 'HighQuality'; $g.CompositingQuality = 'HighQuality'
        if (-not $isPng) { $g.Clear([System.Drawing.Color]::White) }
        $g.DrawImage($img, 0, 0, $width, $h)
        $g.Dispose()
        if ($isPng) { $bmp.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png) } else { $bmp.Save($dest, $jpegCodec, $jpegParams) }
        $bmp.Dispose()
        return [pscustomobject]@{ Name = (Split-Path $dest -Leaf); From = $file.Length; To = (Get-Item $dest).Length }
    } finally { $img.Dispose() }
}

$made = @()
foreach ($job in $jobs) {
    $p = Join-Path $images $job.Path
    if (-not (Test-Path $p)) { continue }
    $files = if ((Get-Item $p).PSIsContainer) { Get-ChildItem $p -File -Include *.jpg, *.jpeg, *.png -Recurse } else { Get-Item $p }
    foreach ($f in $files) { foreach ($w in $job.Widths) { $r = Save-Variant $f $w $job.Prefix $job.Widths[0]; if ($r) { $made += $r } } }
}
# Supporter logos: the marks sit in wide white margins, so write a copy trimmed to the mark (+4% padding).
# The pages show these through <picture> in fixed-height cells (see .logo-wall), the originals stay as src.
function Save-Mark($file) {
    $dest = Join-Path $out ("{0}-mark.jpg" -f [System.IO.Path]::GetFileNameWithoutExtension($file.Name))
    if ((Test-Path $dest) -and -not $Force) { return $null }
    $src = New-Object System.Drawing.Bitmap $file.FullName
    try {
        $rect = New-Object System.Drawing.Rectangle 0, 0, $src.Width, $src.Height
        $data = $src.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadOnly, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $bytes = New-Object byte[] ($data.Stride * $src.Height)
        [System.Runtime.InteropServices.Marshal]::Copy($data.Scan0, $bytes, 0, $bytes.Length)
        $src.UnlockBits($data)
        $minX = $src.Width; $minY = $src.Height; $maxX = -1; $maxY = -1
        for ($y = 0; $y -lt $src.Height; $y++) {
            $row = $y * $data.Stride
            for ($x = 0; $x -lt $src.Width; $x++) {
                $i = $row + $x * 3
                if ($bytes[$i] -lt 225 -or $bytes[$i + 1] -lt 225 -or $bytes[$i + 2] -lt 225) {   # not near-white
                    if ($x -lt $minX) { $minX = $x }; if ($x -gt $maxX) { $maxX = $x }
                    if ($y -lt $minY) { $minY = $y }; if ($y -gt $maxY) { $maxY = $y }
                }
            }
        }
        if ($maxX -lt 0) { return $null }
        $pad = [int][math]::Round([math]::Max($maxX - $minX, $maxY - $minY) * 0.04)
        $x0 = [math]::Max(0, $minX - $pad); $y0 = [math]::Max(0, $minY - $pad)
        $w = [math]::Min($src.Width - $x0, $maxX - $minX + 1 + 2 * $pad); $h = [math]::Min($src.Height - $y0, $maxY - $minY + 1 + 2 * $pad)
        $crop = $src.Clone((New-Object System.Drawing.Rectangle $x0, $y0, $w, $h), [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $q = New-Object System.Drawing.Imaging.EncoderParameters 1
        $q.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality), ([long]90)
        $crop.Save($dest, $jpegCodec, $q); $crop.Dispose()
        return [pscustomobject]@{ Name = (Split-Path $dest -Leaf); From = $file.Length; To = (Get-Item $dest).Length }
    } finally { $src.Dispose() }
}
foreach ($f in Get-ChildItem $images -File -Filter 'supporter-*.jpg') { $r = Save-Mark $f; if ($r) { $made += $r } }

$from = ($made | Measure-Object From -Sum).Sum; $to = ($made | Measure-Object To -Sum).Sum
"{0} variants written to assets/images/thumbs/ ({1:N0} KB of new files)" -f $made.Count, ($to / 1KB)
