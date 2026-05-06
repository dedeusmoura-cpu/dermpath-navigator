from PIL import Image
import os

BASE = "/Applications/DermPathNav/public/images/ted/tp/"

def split(year, q, x_boundaries):
    """x_boundaries = list of [x0, x1] tuples for each panel"""
    src = BASE + f"{year}/ted{year}_tp_{q}_f1.jpg"
    if not os.path.exists(src):
        print(f"  MISSING: {src}")
        return
    img = Image.open(src).convert('RGB')
    W, H = img.size
    print(f"  Source: {os.path.basename(src)} ({W}x{H})")
    for i, (x0, x1) in enumerate(x_boundaries):
        out = src.replace('_f1.jpg', f'_f{i+1}.jpg')
        panel = img.crop((x0, 0, x1, H))
        panel.save(out, 'JPEG', quality=92)
        print(f"    -> {os.path.basename(out)}: {panel.size[0]}x{panel.size[1]}")

def split_h(year, q, y_splits):
    """Split horizontal (top/bottom)"""
    src = BASE + f"{year}/ted{year}_tp_{q}_f1.jpg"
    if not os.path.exists(src):
        print(f"  MISSING: {src}")
        return
    img = Image.open(src).convert('RGB')
    W, H = img.size
    print(f"  Source: {os.path.basename(src)} ({W}x{H})")
    bounds = [0] + y_splits + [H]
    for i, (y0, y1) in enumerate(zip(bounds, bounds[1:])):
        out = src.replace('_f1.jpg', f'_f{i+1}.jpg')
        panel = img.crop((0, y0, W, y1))
        panel.save(out, 'JPEG', quality=92)
        print(f"    -> {os.path.basename(out)}: {panel.size[0]}x{panel.size[1]}")

print("=== 2017 ===")
print("q03:"); split("2017","q03", [(0,434),(434,828),(828,1397)])
print("q05:"); split("2017","q05", [(69,252),(252,424),(424,701),(701,899),(899,1101),(1101,1389)])
print("q06:"); split("2017","q06", [(64,676),(676,1389)])
print("q08:"); split("2017","q08", [(66,356),(356,699),(699,1018),(1018,1390)])
print("q11:"); split("2017","q11", [(61,372),(372,694),(694,1018),(1018,1393)])
print("q12:"); split("2017","q12", [(72,442),(442,805),(805,1395)])
print("q13:"); split("2017","q13", [(0,355),(355,697),(697,1025),(1025,1413)])
print("q14:"); split("2017","q14", [(62,553),(553,1395)])
print("q16:"); split("2017","q16", [(60,247),(247,447),(447,692),(692,973),(973,1395)])
print("q17:"); split("2017","q17", [(64,302),(302,698),(698,1050),(1050,1394)])
print("q18:"); split("2017","q18", [(62,696),(696,1396)])

print("\n=== 2018 ===")
print("q10:"); split("2018","q10", [(0,857),(857,1382)])
print("q14:"); split("2018","q14", [(0,523),(523,1419)])
print("q12:"); split_h("2018","q12", [84])
print("q16:"); split_h("2018","q16", [100])
print("q17:"); split_h("2018","q17", [87])
print("q21:"); split_h("2018","q21", [84])
print("q18:"); split("2018","q18", [(0,697),(697,1393)])

print("\n=== 2019 ===")
print("q01:"); split("2019","q01", [(0,368),(368,722),(722,1060)])
print("q16:"); split("2019","q16", [(0,692),(692,1398)])
print("q23:"); split("2019","q23", [(0,263),(263,1415)])
print("q25:"); split("2019","q25", [(0,595),(595,1419)])
print("q33:"); split("2019","q33", [(0,614),(614,1417)])
print("q03:"); split_h("2019","q03", [490])
print("q09:"); split_h("2019","q09", [476])

print("\nDone!")
