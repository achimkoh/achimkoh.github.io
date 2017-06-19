---
layout: post
title:  Generating text based on scraped data
tags: ["project", "machine learning", "text generation", "media studies"]
---

#### latest update: jun 17

[Nate Pann](http://pann.nate.com) is a popular internet forum in South Korea. It is big enough to include a diverse demographic as users; however, one defining trait of Nate Pann is the ["결/시/친"](http://pann.nate.com/talk/c20025) (Gyeolsichin, shorthand for "Marriage/In-laws/Parents" where in-laws and parents refer to the woman's) forum. Gyeolsichin has an established status as a place where women in distress caused by diverse elements of the patriarchic Korean society come to rant. This characteristic makes it unique compared to other public online communities of comparable sizes, many of which display male-dominant voices. 

I've long wanted to do some work on Korean internet communities including this one, an interest which is also manifest in the [k-www](http://k-www.kr) project. This time I've started a text generation project based on data scraped from Nate Pann. I scraped most of Nate Pann's ["Best Articles"](http://pann.nate.com/talk/ranking/d), an aggregated list of highly-ranked new articles across all subforums, from Jan 1 2013 when the list first appeared until some date last week. Among the 169,795 articles, 18,884 belong to Gyeolsichin.

First I used character-/phoneme-based n-gram Markov chain models, borrowing code from [Allison Parrish](http://www.decontextualize.com/teaching/rwet/n-grams-and-markov-chains/). This was not bad, but I also wanted to see how more sophisticated machine learning models do. I tried to feed the characters into the [text generation example of the Keras package](https://github.com/fchollet/keras/blob/master/examples/lstm_text_generation.py). This led to some difficulties, because of the high volume of input data; I was only able to feed in a little more than 1,000 documents, and the result is largely gibberish.

![]({{site.baseurl}}/assets/text-generation/test_keras_example.png)

So this is where I am now; another potential difficulty is the high dimensionality of Korean characters, which easily reaches 2~3K as opposed to ASCII characters. Excited to learn how to tackle these challenges! More updates coming soon. 

#### previously:

네이트판 명예의 전당에 올라간 글을 재료로 텍스트를 생성하는 프로젝트를 시작했습니다.
우선 어떻게 되는지 보기 위해 유니코드 문자 단위로 n-gram 마코프 모델을 만들어 텍스트를 만들어봤습니다.
코드는 앨리슨 패리시 선생님의 [수업 예제](http://www.decontextualize.com/teaching/rwet/n-grams-and-markov-chains/)를 긁어왔습니다.

![]({{site.baseurl}}/assets/text-generation/test_markov_1.png)

n 값은 4입니다.
카테고리마다 말투나 소재가 되는 단어 등이 다른 것을 어렴풋이 확인할 수 있습니다. 아직 제대로 된 문장이 나오지는 않습니다.

다음 단계로는 자료를 신경망에 집어넣을 경우 더 그럴싸한 문장을 생성할 수 있는지 실험해보려 합니다.
안드레이 카파시의 유명한 [char-rnn 프로젝트](https://github.com/karpathy/char-rnn)를 참고할 예정입니다. 
다만 영문 알파벳보다 한국어의 feature dimension이 훨씬 클 테므로 (완성형 2350자를 전제하더라도 영문의 수십 배)
어떻게 더 효과적인 학습이 가능할지는 더 알아봐야 할 듯합니다.
[김태훈 님의 한국어 시 생성 프로젝트](https://github.com/carpedm20/poet-neural)도 좀 더 자세히 보려고 합니다.
또한 그냥 문자열을 쓰지 않고 [konlpy](http://konlpy.org) 패키지 등을 이용해 형태소로 변환한 자료를 사용하면 어떨지도 봐야겠습니다.
인터넷 커뮤니티에 올라온 글을 재료로 텍스트를 생성하는 프로젝트를 시작했습니다. 아직은 별 거 없지만 언젠가 결시친 베스트 글을 생성해보겠다는 꿈을 품고...

![]({{site.baseurl}}/assets/text-generation/test_markov_2.png)

자료 형식을 문자열 대신 형태소로 바꾸니 더 문장 같은 게 나오기 시작했습니다. 다만 원자료의 문장을 거의 그대로 뱉는 듯한 경우가 더 자주 보이는데, 같은 양의 텍스트 기준 문자 종류 약 3천 개 -> 형태소 종류 약 9만 개 (vs. 원자료는 약 1만9천 건뿐) 로 늘어난 만큼, 주어진 형태소 다음에 올 수 있는 선택지가 줄어들어서 그런 듯.

[소스 코드](https://github.com/achimkoh/text-generation/blob/master/natepann_analysis.ipynb)