"use client";

import { useState } from "react";
import {
    User,
    Lock,
    Bell,
    Save,
    Shield,
    Mail,
    Globe
} from "lucide-react";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            alert("Settings saved successfully!");
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab("profile")}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === "profile"
                                ? "text-panacea-primary"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <User className="w-4 h-4" />
                        Profile
                        {activeTab === "profile" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-panacea-primary" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("security")}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === "security"
                                ? "text-panacea-primary"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Lock className="w-4 h-4" />
                        Security
                        {activeTab === "security" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-panacea-primary" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("notifications")}
                        className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${activeTab === "notifications"
                                ? "text-panacea-primary"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        <Bell className="w-4 h-4" />
                        Notifications
                        {activeTab === "notifications" && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-panacea-primary" />
                        )}
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    {activeTab === "profile" && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-full bg-panacea-primary/10 flex items-center justify-center text-panacea-primary font-bold text-2xl">
                                    A
                                </div>
                                <div>
                                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        Change Avatar
                                    </button>
                                    <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Admin"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        defaultValue="User"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="email"
                                            defaultValue="admin@panaceamedcare.com"
                                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        rows="4"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                        placeholder="Write a short bio..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-6 max-w-2xl">
                            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                                <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-blue-900">Secure Your Account</h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Two-factor authentication adds an extra layer of security to your account. To log in, you'll need to provide a 4 digit code.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Current Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">New Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-panacea-primary/20 focus:border-panacea-primary transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="space-y-6 max-w-2xl">
                            <h3 className="text-lg font-medium text-gray-900">Email Notifications</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">New Leads</h4>
                                        <p className="text-sm text-gray-500">Receive an email when a new lead is submitted.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-panacea-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-panacea-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">New Testimonials</h4>
                                        <p className="text-sm text-gray-500">Get notified when a new testimonial is posted.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-panacea-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-panacea-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">System Updates</h4>
                                        <p className="text-sm text-gray-500">Receive updates about system maintenance and features.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-panacea-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-panacea-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-6 py-2.5 bg-panacea-primary text-white rounded-lg hover:bg-panacea-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
