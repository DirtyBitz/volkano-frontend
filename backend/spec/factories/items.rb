# frozen_string_literal: true

URLS = ['https://i.imgur.com/Hb6S4V5.jpg',
        'https://i.imgur.com/1dOwTta.jpg',
        'https://i.imgur.com/tCjIAXI.jpg',
        'https://i.imgur.com/cgeHUg0.jpg',
        'https://i.imgur.com/qCvWiXb.jpg',
        'https://i.imgur.com/4cJ5ark.jpg',
        'https://i.imgur.com/F8DFXVu.jpg',
        'https://i.imgur.com/fSnrVwr.jpg',
        'https://i.imgur.com/3oxB3UN.jpg',
        'https://i.imgur.com/wctXr3g.jpg',
        'https://i.imgur.com/l4P69GC.jpg',
        'https://i.imgur.com/E89Giwt.jpg',
        'https://i.imgur.com/IK3PaZn.jpg',
        'https://i.imgur.com/lXKj6hH.jpg',
        'https://i.imgur.com/7pHGmUY.jpg',
        'https://i.imgur.com/RBeplE5.jpg',
        'https://i.imgur.com/cBPmUVu.jpg',
        'https://i.imgur.com/uQdAHMH.jpg',
        'https://i.imgur.com/pToJ3Qj.jpg',
        'https://i.imgur.com/YMCo4y3.jpg',
        'https://i.imgur.com/u6assna.jpg',
        'https://i.imgur.com/GBUZK4Q.jpg',
        'https://i.imgur.com/uGWjCX0.jpg',
        'https://i.imgur.com/qR3JJvO.jpg',
        'https://i.imgur.com/lO1VqW4.jpg',
        'https://i.imgur.com/S69Uavv.jpg',
        'https://i.imgur.com/l5W8Rb7.jpg',
        'https://i.imgur.com/YLRhfAr.jpg',
        'https://i.imgur.com/4AmKgmm.jpg',
        'https://i.imgur.com/v7my7u6.jpg',
        'https://i.imgur.com/bQcHrpM.jpg',
        'https://i.imgur.com/G2wwWnq.jpg',
        'https://i.imgur.com/0mwBiUI.jpg',
        'https://i.imgur.com/sKtOoyF.jpg',
        'https://i.imgur.com/IrXcjqo.jpg',
        'https://i.imgur.com/Y96jVLh.jpg',
        'https://i.imgur.com/BFYwbBx.jpg',
        'https://i.imgur.com/61OBTBB.jpg',
        'https://i.imgur.com/Fe9fOFb.jpg',
        'https://i.imgur.com/F6Bt3Sc.jpg',
        'https://i.imgur.com/LPrR0rZ.jpg',
        'https://i.imgur.com/TF6rGSo.jpg',
        'https://i.imgur.com/8UExlOf.jpg',
        'https://i.imgur.com/jWPZDWJ.jpg',
        'https://i.imgur.com/JILtcnD.jpg',
        'https://i.imgur.com/MEDyjO6.jpg',
        'https://i.imgur.com/KoE3E51.jpg',
        'https://i.imgur.com/dc6n1nX.jpg',
        'https://i.imgur.com/9eo8CvC.jpg',
        'https://i.imgur.com/Zmy7Vay.jpg',
        'https://i.imgur.com/zkSfQqD.jpg',
        'https://i.imgur.com/bOi0h24.jpg',
        'https://i.imgur.com/sO0ZT5M.jpg',
        'https://i.imgur.com/tqARFBM.jpg',
        'https://i.imgur.com/Hi0Hbss.jpg',
        'https://i.imgur.com/9qS7WGe.jpg'].freeze

TAGS = %w[funny sexy doggo meme isak_cosplay].freeze

FactoryBot.define do
  sequence :title do |n|
    "Item ##{n}"
  end

  sequence :image_url do |n|
    n < URLS.length ? URLS[n] : "https://example.com/image#{n}.jpg"
  end

  factory :item do
    url { generate(:image_url) }
    title
    user

    after(:create) do |item, _|
      random_tags = TAGS.sample([*1..TAGS.length].sample).join(', ')
      item.tag_list.add(random_tags, parse: true)
      item.save
      item.reload
    end
  end
end
