// src/components/StoriesSlider.tsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../lib/supabaseClient";
import type { Blog } from "../types/blog";

const StoriesSlider = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    const { data, error } = await supabase
      .from("blogs")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching blogs:", error);
    } else {
      setBlogs(data?.slice(0, 5) || []);
    }
  };

  useEffect(() => {
    fetchBlogs();
    AOS.init();

    const channel = supabase
      .channel("blogs-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "blogs" }, fetchBlogs)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (blogs.length === 0) {
    return <p className="text-center">No stories found</p>;
  }

  return (
    <section className="py-5" id="stories">
      <Container>
        <Row className="mb-4 text-center">
          <h2 className="fw-bold">Blogs & Devotional</h2>
          <p className="text-muted">Faith-building content for your spiritual journey</p>
        </Row>

        <Row className="justify-content-center" data-aos="fade-left">
          <Col md={10}>
            <Carousel
              fade
              indicators={false}
              interval={10000}
              controls
              touch
              slide
              className="shadow-sm"
              nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}
              prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
            >
              {blogs.map((post) => (
                <Carousel.Item key={post.id}>
                  <Card className="border-0">
                    <Card.Img
                      src={post.image_url}
                      alt={post.title}
                      style={{ height: "250px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title className="fw-bold">{post.title}</Card.Title>
                      <Card.Text className="text-muted" style={{ fontSize: "0.95rem" }}>
                        {post.body.length > 100
                          ? `${post.body.slice(0, 100)}...`
                          : post.body}
                      </Card.Text>
                      <a href="/blog" style={{
                        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
                        color: '#fff',
                      }} className="btn btn-outline-primary mt-2 rounded-pill">
                        Read More Articles
                      </a>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StoriesSlider;
