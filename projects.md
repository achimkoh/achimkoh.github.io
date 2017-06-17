---
layout: page
title: Projects
permalink: /projects/
featured: true
---

{% for post in site.tags.project %}
[{{ post.title }}]({{ post.url }})
{% endfor %}