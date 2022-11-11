---
title: Resources
display: Resources
subtitle: List of resources that I am aware of
plum: true
resources:
  Blogs:
    - name: 'Graphical Network'
      link: 'https://twitter.com/antfu7/status/1504639906232307712'
      desc: 'Time traveling for the Web'
      icon: 'i-fa6-solid-blog'
    - name: 'Low Concurrency Network'
      link: 'https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&album_id=1703494881072955395'
      desc: 'Time traveling for the Web'
      icon: 'i-fa6-solid-blog'

  Books:
    - name: 'Graphical HTTP'
      link: 'https://github.com/Alice52/common-http/files/9137762/HTTP-.pdf'
      desc: 'Time traveling for the Web'
      icon: 'i-bi-book'

  Videos:
    - name: 'How the network work？'
      link: 'https://b23.tv/EE8gYje'
      desc: 'Time traveling for the Web'
      icon: 'i-ri-movie-line'
    - name: 'How the browser work？'
      link: 'https://b23.tv/Y61ZwnV'
      desc: 'Time traveling for the Web'
      icon: 'i-ri-movie-line'
---

<ListResources :resources="frontmatter.resources" />