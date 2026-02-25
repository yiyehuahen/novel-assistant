FROM modelscope-registry.cn-beijing.cr.aliyuncs.com/modelscope-repo/python:3.10

WORKDIR /home/user/app

# 复制依赖文件
COPY requirements.txt .

# 安装依赖
RUN pip install flask==2.3.0 requests==2.28.0

# 复制应用文件
COPY app.py .
COPY static ./static

EXPOSE 7860

ENTRYPOINT ["python", "-u", "app.py"]
