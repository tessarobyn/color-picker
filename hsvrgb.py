# hsv = 197°, 59%, 67%
# rgb = 70, 142, 171

h=197
s=.59
v=.67

c=v*s
x=c*(1-abs((h/60)%2-1))
m=v-c
arr=[]
if 0 <= h < 60:
    arr=[c,x,0]
elif 60 <= h < 120:
    arr=[x,c,0]
elif 120 <= h < 180:
    arr=[0,c,x]
elif 180 <= h < 240:
    arr=[0,x,c]
elif 240 <= h < 300:
    arr=[x,0,c]
elif 300 <= h < 360:
    arr=[c,0,x]
    
rgb=[]
rgb.append(round((arr[0]+m)*255))
rgb.append(round((arr[1]+m)*255))
rgb.append(round((arr[2]+m)*255))
print(rgb)
