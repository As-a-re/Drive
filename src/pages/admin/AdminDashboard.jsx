import { useState, useEffect } from "react";
import { Users, CreditCard, BookOpen, CalendarCheck, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    activeLessons: 0,
    totalEnrollments: 0,
    revenueChange: 0,
    studentsChange: 0,
    lessonsChange: 0,
    enrollmentsChange: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await api.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        toast.error("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.studentsChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.studentsChange >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.studentsChange)}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">GH₵{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.revenueChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.revenueChange >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.revenueChange)}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeLessons}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.lessonsChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.lessonsChange >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.lessonsChange)}
              </span>{" "}
              new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrollments</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEnrollments}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              {stats.enrollmentsChange >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              )}
              <span className={stats.enrollmentsChange >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(stats.enrollmentsChange)}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional dashboard content would go here */}
      <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <p className="text-gray-500">Loading recent activities...</p>
        <div className="mt-4">
          <Button>View All Activity</Button>
        </div>
      </div>
    </div>
  );
}