# laravle创建命令

```
composer create-project laravel/laravel example-app
```



# 修改composer中国镜像

```bash
composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/  阿里云镜像
```

# .htaccess文件

```
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>
 
    RewriteEngine On
 
    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]
 
    # Redirect Trailing Slashes If Not A Folder...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]
 
    # Handle Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

# trans()函数

```

```

# 验证码插件

```
1.composer require mews/captcha
2.'providers' => [
        // ...
        Mews\Captcha\CaptchaServiceProvider::class,
    ]
3.     'aliases' => [
        // ...
        'Captcha' => 'Mews\Captcha\Facades\Captcha',
    ]
 4. php artisan vendor:publish
 5.只需在request里面定义规则 'required|captcha'就可以实现验证
```

# git常用命令

```
1 配置邮箱和用户名
git config --global user.email "邮箱名"
git config --global user.name "用户名"
git init            初始化一个git仓库
git branch          查看仓库分支情况
git branch -d 分支名称  删除分支
git checkout 分支名称    切换分支
ssh-keygen -t rsa       指定RSA算法生成秘钥

```

