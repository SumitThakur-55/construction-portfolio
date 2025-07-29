import BookCall from '@/components/BookCall';

export default function BookCallPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Schedule a Call</h1>
          <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
        </div>
        <BookCall />
      </div>
    </div>
  );
}