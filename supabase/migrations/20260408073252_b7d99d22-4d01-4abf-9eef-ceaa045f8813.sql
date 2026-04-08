ALTER TABLE blog_posts ADD COLUMN counterpart_slug text;
ALTER TABLE blog_posts_pl ADD COLUMN counterpart_slug text;

UPDATE blog_posts SET counterpart_slug = 'zbuduj-publicznosc-zanim-zbudujesz-produkt' WHERE slug = 'build-audience-before-product-mva-framework';
UPDATE blog_posts_pl SET counterpart_slug = 'build-audience-before-product-mva-framework' WHERE slug = 'zbuduj-publicznosc-zanim-zbudujesz-produkt';